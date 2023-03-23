import Head from "next/head";
import BookingForm from "../components/Forms/BookingForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Hoppers Unlimited - Booking</title>
        <meta name="description" content="Hoppers Unlimited Booking Form" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <BookingForm />
      <Footer />
    </>
  );
}
