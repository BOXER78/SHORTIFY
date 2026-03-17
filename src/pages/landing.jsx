import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="flex flex-col items-center pt-10 sm:pt-20">
      <h2 className="my-10 sm:my-16 text-4xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold tracking-tight leading-none animate-in fade-in slide-in-from-bottom-5 duration-700">
        Simplify your links. <br />
        <span className="gradient-text">Amplify your reach.</span>
      </h2>
      <form
        onSubmit={handleShorten}
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
      >
        <Input
          type="url"
          placeholder="Paste your long link here..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="h-full flex-1 py-6 px-6 bg-white/5 border-white/10 text-white rounded-xl focus:ring-2 focus:ring-purple-500 transition-all text-lg"
        />
        <Button type="submit" className="h-full px-10 text-lg font-bold bg-gradient-to-r from-purple-600/90 to-blue-600/90 hover:from-purple-600 hover:to-blue-600 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all border border-white/10">
          Shorten Link
        </Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-20 w-full px-4 sm:px-0">
        <div className="glass-card p-8 flex flex-col items-center text-center space-y-4 hover:scale-[1.02] transition-all">
          <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-white">Lightning Fast</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Shorten your long, bulky URLs into memorable links in less than a second.</p>
        </div>
        <div className="glass-card p-8 flex flex-col items-center text-center space-y-4 hover:scale-[1.02] transition-all">
          <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-white">Detailed Analytics</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Track every click. Know where your audience comes from and which devices they use.</p>
        </div>
        <div className="glass-card p-8 flex flex-col items-center text-center space-y-4 hover:scale-[1.02] transition-all">
          <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-white">Custom Links</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Personalize your links to match your brand and build trust with your audience.</p>
        </div>
      </div>
      <Accordion type="multiple" collapsible className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How does Shortify work?
          </AccordionTrigger>
          <AccordionContent>
            When you enter a long URL, our system generates a shorter version of
            that URL. This shortened URL redirects to the original long URL when
            accessed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Do I need an account to use the app?
          </AccordionTrigger>
          <AccordionContent>
            Yes. Creating an account allows you to manage your URLs, view
            analytics, and customize your short URLs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            What analytics are available for my shortened URLs?
          </AccordionTrigger>
          <AccordionContent>
            You can view the number of clicks, geolocation data of the clicks
            and device types (mobile/desktop) for each of your shortened URLs.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LandingPage;
