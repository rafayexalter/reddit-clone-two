import { useRouter } from "next/router";
import { Prisma, User } from "@prisma/client";
import { useSession } from "next-auth/client";
import Moment from "react-moment";
import PostCard from "../../components/PostCard";
import useSWR from "swr";
import { fetchData } from "../../utils";

type SubWithPosts = Prisma.SubredditGetPayload<{
  include: {
    posts: { include: { user: true; subreddit: true } };
    joinedUsers: true;
  };
}>;

const Sub = ({ subData }: { subData: SubWithPosts }) => {
  const router = useRouter();
  const { sub } = router.query;
  const [session, loading] = useSession();

  const { data, error } = useSWR(
    `/api/subreddit/findSub?name=${sub}`,
    fetchData,
    {
      initialData: subData,
    }
  );

  const {
    name,
    displayName,
    infoBoxText,
    joinedUsers,
    posts,
    createdAt,
    id,
  } = data;

  const joined =
    joinedUsers.filter((user: User) => user.name === session?.user.name)
      .length > 0;

  return (
    <>
      <div className="h-16 bg-blue-500" />
      <div className="bg-white h-18">
        <div className="container relative flex flex-col px-12 py-2 mx-auto">
          <div className="absolute w-16 h-16 bg-blue-400 border-2 border-white rounded-full bottom-4" />
          <div className="flex items-center">
            <h4 className="ml-20 text-2xl font-bold text-gray-700">
              {displayName}
            </h4>
            <button className="px-3 py-1 ml-4 text-sm font-semibold text-green-400 border border-green-400 rounded-md focus:outline-none">
              {joined ? "JOINED" : "JOIN"}
            </button>
          </div>
          <p className="ml-20 text-sm text-gray-600">r/{sub}</p>
        </div>
      </div>
      <div className="bg-gray-300">
        <div className="container flex items-start px-4 py-4 mx-auto">
          {/* Left Column (Posts) */}
          <div className="w-2/3">
            <button className="w-full py-2 bg-white rounded-md shadow-sm outline-none hover:shadow-lg focus:outline-none">
              Create Post
            </button>
            {posts.map((post) => (
              <PostCard post={post} key={id} />
            ))}
          </div>

          {/* >Right Column (sidebar) */}
          <div className="w-1/3 ml-4 bg-white rounded-md">
            <div className="px-2 py-4 bg-blue-500 rounded-t-md">
              <p className="text-sm font-bold text-white">About Community</p>
            </div>
            <div className="p-2">
              <p>{infoBoxText}</p>
              <div className="flex w-full mt-2 font-semibold">
                <div className="w-full">
                  <p>{joinedUsers.length}</p>
                  <p className="text-sm">Members</p>
                </div>
                <div className="w-full">
                  <p>{posts.length}</p>
                  <p className="text-sm">Total Posts</p>
                </div>
              </div>
              <div className="w-full h-px my-4 bg-gray-300" />
              <p className="mb-4 text-md">
                <b>Created - </b>{" "}
                <Moment format="YYYY/MM/DD">{createdAt}</Moment>
              </p>
              <button className="w-full py-1 font-semibold text-white bg-blue-500 rounded-md focus:outline-none">
                CREATE POST
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const url = `${process.env.APP_URL}/api/subreddit/findSub?name=${context.query.sub}`;
  const subData = await fetchData(url);

  return {
    props: {
      subData,
    },
  };
}

export default Sub;
