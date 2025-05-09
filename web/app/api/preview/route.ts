import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const draft = await draftMode();
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const type = searchParams.get("type");
  const preview = searchParams.get("sanity-preview-pathname") || "";
  console.log({ preview });
  // const target = type === "project" ? `/project/${slug}` : `/${slug}`
  let target = "";
  switch (type) {
    // case "project":
    //   target = `/project/${slug}`;
    //   break;
    case "landing":
      target = `/`;
      break;
    // case "home":
    //   target = `/`;
    //   break;
    default:
      target = `/${slug}`;
      break;
  }
  if (!type) target = preview;
  // console.log(request.url)
  console.log(type, slug, target);

  // draftMode().enable();
  draft.enable();
  redirect(target);
}
