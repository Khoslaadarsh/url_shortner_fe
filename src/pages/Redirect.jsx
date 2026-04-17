import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resolveUrl } from "../services/urlService";
import { NotFound } from "../components/NotFound";

export default function Redirect() {
  const { slug } = useParams();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug?.trim()) {
      setNotFound(true);
      return;
    }

    resolveUrl(slug)
      .then((data) => {
        console.log("Resolved URL data:", data);
      })
      .catch((err) => {
        console.error("Error resolving URL:", err);
        setNotFound(true);
      });
  }, [slug]);

  if (notFound) return <NotFound slug={slug} />;

  return <></>;
}
