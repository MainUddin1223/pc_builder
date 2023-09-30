import RootLayout from "@/components/Layout/RootLayout";
import Head from "next/head";

const Profile = () => {
    return (
        <>
            <Head>
                <title>PC_BUILDER</title>
                <meta
                    name="description"
                    content="This is pc builder made by next-js"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                this is profile
            </div>
        </>
    )
}
Profile.getLayout = function getLayout(page: React.ReactNode) {
    return <RootLayout>{page}</RootLayout>;
};
export default Profile