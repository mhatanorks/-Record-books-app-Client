import { getServerAuthSession } from "@/server/auth";
import Login from "./components/ui/Login";
import Dashboard from "./components/ui/Dashboards/Dashboard";


export default async function Home() {
  const session = await getServerAuthSession();
  // console.log(session)
  return (
    <>
      {/* ログインの状態で出し分ける */}
      {session ? (
        <div className="mt-10">

          <Dashboard session={session} />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
