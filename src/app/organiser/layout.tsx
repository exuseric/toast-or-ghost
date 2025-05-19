import { UserMenu } from "@/components/navigation/user-menu";
import { createClient } from "@/lib/supabase/server";
import "@/styles/globals.css";
import { InfoIcon } from "lucide-react";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();
    
    return (
        <html>
            <body>
                <div className="w-full content-grid bg-accent">
                    <div className="text-sm p-3 px-5 rounded-md text-foreground flex gap-3 justify-between items-center">
                        <div className="flex gap-2">
                            <InfoIcon size="16" strokeWidth={2} />
                            This is a protected page that you can only see as an authenticated
                            user
                        </div>

                        <UserMenu user={user} />
                    </div>
                </div>
                <div className="content-grid">{children}</div>
            </body>
        </html>
    );
}
