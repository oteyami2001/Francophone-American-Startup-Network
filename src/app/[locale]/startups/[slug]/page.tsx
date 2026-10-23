import { profileRoute } from "@/components/DirectoryPage";

const route = profileRoute("startup");

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
