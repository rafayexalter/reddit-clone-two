import { Prisma } from ".prisma/client";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Post = Prisma.PostGetPayload<{
  include: { user: true; subreddit: true };
}>;

export default function PostCard({ post }: { post: Post }) {
  const { title, user } = post;
  return (
    <div className="w-full p-4 mt-4 bg-white rounded-md ">
      <div className="flex">
        <div className="flex flex-col mr-3">
          <i className="text-gray-600 cursor-pointer icon-arrow-up hover:text-red-500" />
          <div className="text-center">{"3"}</div>
          <i className="text-gray-600 cursor-pointer icon-arrow-down hover:text-blue-600" />
        </div>

        <div>
          <p className="text-sm text-gray-500">Posted by u/{user.name}</p>
          <p className="text-2xl font-semibold text-gray-900">{title}</p>
          <p className="text-gray-700">{post.body}</p>
          <div>
            <p>
              {/*comment icon */} {/*comment count*/} comments
            </p>
            <p>Share</p>
          </div>
        </div>
      </div>
    </div>
  );
}
