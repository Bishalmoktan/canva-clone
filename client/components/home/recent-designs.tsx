"use client";

import { getUserDesigns } from "@/services/design.service";
import Link from "next/link";
import { useEffect, useState } from "react";

function RecentDesigns() {
  const [recentDesigns, setRecentDesigns] = useState([]);

  useEffect(() => {
    const fetchUserDesigns = async () => {
      const result = await getUserDesigns();

      if (result.success) {
        setRecentDesigns(result.data);
      }
    };

    fetchUserDesigns();
  }, []);
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Designs</h2>
      <div className="mt-2">
        {!recentDesigns.length && <p>No Design found</p>}
        {recentDesigns.map((design) => (
          <Link href={`/editor/${design._id}`} key={design._id}>
            {design.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecentDesigns;
