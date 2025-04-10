export const StaticMap = async () => {
  const API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;

  return (
    <iframe
      width="600"
      height="450"
      loading="lazy"
      src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}
    &q=Space+Needle,Seattle+WA`}
    ></iframe>
  );
};
