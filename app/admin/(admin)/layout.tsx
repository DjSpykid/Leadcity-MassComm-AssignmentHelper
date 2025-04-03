
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export default async function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const token = cookies().get("admin-token")?.value;
//   const isAuthenticated = token === process.env.ADMIN_SECRET_TOKEN;

//   if (!isAuthenticated) {
//     redirect("/admin/login");
//   }

//   return (
//     <div className="admin-container">
//       <AdminSidebar />
//       <div className="admin-main">
//         <AdminNavbar />
//         <div className="admin-content">{children}</div>
//       </div>
//     </div>
//   );
// }





// app/admin/(admin)/layout.tsx
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSideBar";

import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This is the correct way to check auth in a server component
  const isAuth = await isAdminAuthenticated();
  
  if (!isAuth) {
    redirect('/admin/login');
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminNavbar />
        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
}