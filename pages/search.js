import React from 'react'
import {useRouter} from "next/dist/client/router";
import Header from '../components/Header';
import Footer from "../components/Footer";
import { format } from 'date-fns';
import InfoCard from '../components/InfoCard';
import Map from "../components/Map";

const Search = ({searchResults}) => {
    const router = useRouter();
    const {location, startDate, endDate, numberOfGuests} = router.query;
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
    const dateRange = `${formattedStartDate} - ${formattedEndDate}`;

    return (
        <div>
            <Header placeholder={`${location} | ${dateRange} | ${numberOfGuests} guests`}/>
                <main className="flex">
                    <section className="flex-grow pt-14 px-6">
                        <p className="text-xs">300+ stays - {dateRange} - for {numberOfGuests} number of guests</p>
                        <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

                        <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                            <p className="button">Cancellation Flexibility</p>
                            <p className="button">Type of place</p>
                            <p className="button">Price</p>
                            <p className="button">Rooms and beds</p>
                            <p className="button">More filters</p>
                        </div>

                        <div className="flex flex-col">
                        {searchResults.map((
                            {img, location, title, description, star, price, total}
                        ) => (
                            <InfoCard 
                            key={img}
                            img={img}
                            location={location}
                            title={title}
                            description={description}
                            star={star}
                            price={price}
                            total={total}  
                            />
                        ))}
                        </div>
                    </section> 
                    <section className="hidden xl:inline-flex xl:min-w-[600px]">
                        <Map searchResults={searchResults}/>
                    </section>  
                </main>
            <Footer />
        </div>
    )
}

export default Search;
export async function getServerSideProps(){
    const searchResults = await fetch("https://links.papareact.com/isz")
    .then(response => response.json());
    return {
        props:{
            searchResults
        }
    }
}
