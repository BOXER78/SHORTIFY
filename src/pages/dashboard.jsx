// can add sonner from shadcn ui after link created

import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Filter } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "SHORTIFY/src/components/ui/card";
import { Input } from "SHORTIFY/src/components/ui/input";
import { CreateLink } from "SHORTIFY/src/components/create-link";
import LinkCard from "SHORTIFY/src/components/link-card";
import Error from "SHORTIFY/src/components/error";

import useFetch from "SHORTIFY/src/hooks/use-fetch";

import { getUrls } from "SHORTIFY/src/db/apiUrls";
import { getClicksForUrls } from "SHORTIFY/src/db/apiClicks";
import { UrlState } from "SHORTIFY/src/context";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();
  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user.id);
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  return (
    <div className="flex flex-col gap-8">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="text-gray-400 font-medium">Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-black gradient-text">{urls?.length}</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="text-gray-400 font-medium">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-black gradient-text">{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <CreateLink />
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error?.message} />}
      {(filteredUrls || []).map((url, i) => (
        <LinkCard key={i} url={url} fetchUrls={fnUrls} />
      ))}
    </div>
  );
};

export default Dashboard;
