import Head from "next/head";
import Script from "next/script";
import BookingForm from "../components/Forms/BookingForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Hoppers Unlimited - Booking || Melbourne || Hoppers Catering
        </title>
        <meta
          name="description"
          content="Hoppers Unlimited accepts online Bookings for Sri Lankan style Hoppers catering in Melbourne for any party, event or function. Please fill & submit our booking form and we will contact you soon"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=Function.prototype`}
        strategy="beforeInteractive"
        // strategy="afterInteractive"
      ></Script>
      <Navbar />
      <BookingForm />
      <Footer />
    </>
  );
}
