
export interface BookingProps {
    id: string;
    user: string;
    parc: string;
    bookingdate: Date
    comments: string;
}

export default function BookingComponent({ parc, bookingdate, comments }: BookingProps) {

    return (<  >
        <p className='mb-0 font-sans font-semibold leading-normal text-sm'>{parc}</p>
        <p className='mb-0 font-sans font-semibold leading-normal text-sm'></p>
        <p className='mb-0 font-sans font-semibold leading-normal text-sm'>{comments}</p>
    </>
    )
}