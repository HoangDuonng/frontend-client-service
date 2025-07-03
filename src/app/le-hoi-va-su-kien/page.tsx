import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventsClientWrapper from '@/components/Events/EventsClientWrapper';
import BackToTop from '@/components/layout/backToTop';
import ChatPopup from '@/components/layout/chatPopup';

export default function EventsPage() {
    return (
        <>
            <Header />
            <EventsClientWrapper />
            <Footer />
            <BackToTop />
            <ChatPopup />
        </>
    );
}
