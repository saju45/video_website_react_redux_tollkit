import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/ui/Loading";
import { fetchTags } from "../../features/tags/tagsSlice";
import Tag from "./Tag";
export default function Tags() {
  const dispatch = useDispatch();
  const { tags, isLoading, isError, error } = useSelector(
    (state) => state.tags
  );

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  //decide what to render
  let content;

  if (isLoading) content = <Loading />;
  if (!isLoading && isError)
    content = <div className="col-span-12">s{error}</div>;

  if (!isLoading && !isError && tags?.length === 0) {
    content = <div className="col-span-12">No tag found</div>;
  }

  if (!isLoading && !isError && tags?.length > 0) {
    content = tags.map((tag) => <Tag key={tag.id} tag={tag} />);
  }

  return tags?.length > 0 ? (
    <section>
      <div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 border-b overflow-y-auto">
        {tags.map((tag) => (
          <Tag key={tag.id} title={tag.title} />
        ))}
      </div>
    </section>
  ) : null;
}
