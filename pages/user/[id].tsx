import type { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';

import BookingComponent, { BookingProps } from '@/components/Booking';

interface UserProps {
    id: string;
    name: string;
    email: string;
}

interface IParams extends ParsedUrlQuery {
    id: string;
}

interface Props {
    user: UserProps;
    bookings: Array<BookingProps> | null
}
const api = process.env.NEXT_PUBLIC_API_URL

export default function User({ user, bookings }: Props) {

    const { name } = user;

    return (
        <div >
            <h2>{name}</h2>
            <div className='w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4'>
                {bookings && bookings?.length > 0 ? (
                    bookings.map((booking, index) => (
                        <BookingComponent key={index} {...booking} />
                    ))
                ) : (
                    <p className='mb-0 font-sans font-semibold leading-normal text-sm'>There are no bookings avabliable</p>
                )}

            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const api = process.env.NEXT_PUBLIC_API_URL
    let bookings;
    const { id } = params as IParams;

    const userData = await fetch(`${api}users/${id}`).then((res) => res.json()).catch(err => console.log('err', err));
    const bookingsData = await fetch(`${api}bookings`).then((res) => res.json()).catch(err => console.log('err', err));
    if (bookingsData.data) bookings = bookingsData.data.filter((bookings: BookingProps) => bookings.user === id)

    return {
        props: {
            user: userData,
            bookings: bookings,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const allUsers = await fetch(`${api}users`).then((res) => res.json()).catch(err => console.log('err', err));

    return {
        paths: allUsers?.data.map((data: any) => ({
            params: { id: data.id },
        })),
        fallback: true,
    };
};

