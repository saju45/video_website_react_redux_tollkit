import RelatedVideoListItem from "./RelatedVideoListItem";
export default function RelatedVideoList({ currentVideoId, tags }) {
  return (
    <div class="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      <RelatedVideoListItem />
    </div>
  );
}
