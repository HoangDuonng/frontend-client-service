import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExploreBanner from '@/components/Banner/ExploreBanner';
import Experiences from '@/components/Experiences';
import Events from '@/components/Events';
import BackToTop from '@/components/layout/backToTop';
import ChatPopup from '@/components/layout/chatPopup';

export default async function ExplorePage() {
    return (
        <>
            <Header />
            <main className="mx-auto">
                <ExploreBanner />
                <Experiences />
                <Events />
            </main>
            <Footer />
            <BackToTop />
            <ChatPopup />
        </>
    );
} 
