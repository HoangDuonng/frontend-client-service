import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TravelGuideClientWrapper from '@/components/TravelGuide/TravelGuideClientWrapper';
import BackToTop from '@/components/layout/backToTop';
import ChatPopup from '@/components/layout/chatPopup';

export default function TravelGuidePage() {
    return (
        <>
            <Header />
            <TravelGuideClientWrapper />
            <Footer />
            <BackToTop />
            <ChatPopup />
        </>
    );
} 
