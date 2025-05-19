import { testConnection } from "@/server/db/utils/test-connection";

export async function GET() {
    const result = await testConnection();
    return new Response(JSON.stringify({ status: result ? "connected" : "failed" }));
}
