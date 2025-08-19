"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProjectsIndexRedirect() {
	const router = useRouter();
	useEffect(() => {
		router.replace("/#projects");
	}, [router]);
	return null;
}