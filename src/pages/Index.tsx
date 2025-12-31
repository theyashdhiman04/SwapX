import SwapNavbar from "@/components/SwapNavbar";
import SwapInterface from "@/components/SwapInterface";
import StatsSection from "@/components/StatsSection";
import DEXIntegrations from "@/components/DEXIntegrations";
import SupportedNetworks from "@/components/SupportedNetworks";
import HowItWorks from "@/components/HowItWorks";
import SwapFooter from "@/components/SwapFooter";
import CurvedLoop from "@/components/CurvedLoop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SwapNavbar />
      <SwapInterface />
      
      {/* Curved Loop Separator */}
      <div className="relative z-20 w-screen overflow-visible" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
        <div className="py-8 sm:py-12 border-y border-border/50">
          <CurvedLoop speed={1.6} />
        </div>
      </div>
      
      <StatsSection />
      <DEXIntegrations />
      <HowItWorks />
      <SupportedNetworks />
      
      {/* Curved Loop Separator before Footer */}
      <div className="py-8 sm:py-12 border-t border-border/50">
        <CurvedLoop speed={1.6} marqueeText="SwapX • Secure • Fast • Multi-Chain • SwapX • Secure • Fast • Multi-Chain" />
      </div>
      
      <SwapFooter />
    </div>
  );
};

export default Index;
