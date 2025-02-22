export default async function RankingPageLoader() {
  return (
    <ul className="w-full space-y-2">
      <UserSkeletonRanking />
      <UserSkeletonRanking />
      <UserSkeletonRanking />
      <UserSkeletonRanking />
      <UserSkeletonRanking />
      <UserSkeletonRanking />
      <UserSkeletonRanking />
      <UserSkeletonRanking />
      <UserSkeletonRanking />
      <UserSkeletonRanking />
    </ul>
  );
}

const UserSkeletonRanking = () => {
  return (
    <li className="flex flex-row items-center gap-2 p-4 border border-neutral-700 rounded-lg relative *:animate-pulse">
      <div className="bg-neutral-700 size-9 rounded-full flex items-center justify-center"></div>
      <span className="flex flex-col gap-2 *:rounded-lg w-full">
        <div className="p-2 bg-neutral-800 w-7/12"></div>
        <div className="p-2 text-sm bg-neutral-800 w-5/12"></div>
      </span>
    </li>
  );
};
