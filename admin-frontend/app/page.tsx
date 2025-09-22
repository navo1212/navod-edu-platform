import Layout from "../components/Layout";
import LoginRegisterForm from "../components/LoginRegisterForm";

export default function HomePage() {
  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-4">Welcome</h2>
      <LoginRegisterForm />
    </Layout>
  );
}
