import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <svg
        width="40px"
        height="40px"
        viewBox="0 0 15 15"
        version="1.1"
        id="rocket"
        xmlns="http://www.w3.org/2000/svg"
        fill="#5d4bf3"
      >
        <path
          id="path7143"
          d="M12.5547,1c-2.1441,0-5.0211,1.471-6.9531,4H4&#xA;&#x9;C2.8427,5,2.1794,5.8638,1.7227,6.7773L1.1113,8h1.4434H4l1.5,1.5L7,11v1.4453v1.4434l1.2227-0.6113&#xA;&#x9;C9.1362,12.8206,10,12.1573,10,11V9.3984c2.529-1.932,4-4.809,4-6.9531V1H12.5547z M10,4c0.5523,0,1,0.4477,1,1l0,0&#xA;&#x9;c0,0.5523-0.4477,1-1,1l0,0C9.4477,6,9,5.5523,9,5v0C9,4.4477,9.4477,4,10,4L10,4z M3.5,10L3,10.5C2.2778,11.2222,2,13,2,13&#xA;&#x9;s1.698-0.198,2.5-1L5,11.5L3.5,10z"
        />
      </svg>

      <h1 className="text-4xl mb-1 font-bold text-blueLotus">Rocket</h1>
    </Link>
  );
}
