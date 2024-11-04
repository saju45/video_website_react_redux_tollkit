import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedVideos } from "../../features/relatedVideos/realatedVideosSlice";
import Loading from "../ui/Loading";
import RelatedVideoListItem from "./RelatedVideoListItem";
export default function RelatedVideoList({ currentVideoId, tags }) {
  const dispatch = useDispatch();
  const { relatedVideos, isLoading, isError, error } = useSelector(
    (state) => state.relatedVideos
  );

  console.log("relatedVideos : ", relatedVideos);

  useEffect(() => {
    dispatch(fetchRelatedVideos({ tags, id: currentVideoId }));
  }, [dispatch, currentVideoId, tags]);

  //decide what to render
  let content = null;

  if (isLoading) content = <Loading />;
  if (!isLoading && isError)
    content = <div className="col-span-12">s{error}</div>;

  if (!isLoading && !isError && relatedVideos?.length === 0) {
    content = <div className="col-span-12">No video found</div>;
  }

  if (!isLoading && !isError && relatedVideos?.length > 0) {
    content = relatedVideos.map((video) => (
      <RelatedVideoListItem key={video.id} video={video} />
    ));
  }

  return (
    <div class="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
}
