import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();

  const { loading, data, fn } = useFetch(getLongUrl, id);

  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#05050a] z-50 p-6">
        <div className="relative mb-8">
          <div className="absolute -inset-4 bg-purple-500/20 blur-2xl rounded-full"></div>
          <span className="relative text-5xl font-black bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent tracking-tighter">
            SHORTIFY
          </span>
        </div>
        <BarLoader width={200} color="#9333ea" />
        <p className="mt-8 text-gray-400 font-medium animate-pulse tracking-wide">
          Navigating to your destination...
        </p>
      </div>
    );
  }

  return null;
};

export default RedirectLink;
