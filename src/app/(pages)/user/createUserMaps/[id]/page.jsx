import { Box } from "@mui/material";
import CreateGoogleMap from "../components/CreateGoogleMap";
import { cookies } from "next/headers";

export async function fetchData(id, sessionToken) {
  console.log(id, sessionToken);

  try {
    const response = await fetch(`http://localhost:3000/api/getMap/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `next-auth.session-token=${sessionToken};path=/;expires=Session`,
      },
      credentials: "include",
    });
    const responseData = await response.json();

    console.log(responseData);
    if (!responseData.map) throw new Error("Map not found");
    return {
      map: responseData.map,
    };
  } catch (err) {
    console.log(err);

    return {
      map: null,
    };
  }
}

export default async function ListMaps({ params }) {
  const cookieStore = cookies();
  let sessionTokenCookie = cookieStore.get("next-auth.session-token");
  let sessionToken = sessionTokenCookie?.value || null;
  const { id } = params;
  // console.log(id);
  const data = await fetchData(id, sessionToken);
  console.log(data);

  return (
    <Box
      sx={{
        // backgroundColor: "primary.main.pageBg1",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "1rem 2rem",
        minHeight: "90vh",
      }}
    >
      <CreateGoogleMap mapData={data?.map} />
    </Box>
  );
}
