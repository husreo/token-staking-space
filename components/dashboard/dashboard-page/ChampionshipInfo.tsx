export default function ChampionshipInfo() {
  return (
    <div className="flex h-full flex-1 items-center border-b border-l border-white/[0.15] max-sm:flex-col">
      <div className="flex h-[400px] w-[400px] items-center max-[375px]:w-full">
        <video autoPlay muted loop style={{ mixBlendMode: "screen" }}>
          <source src="/images/v2/0001_2.mp4" type="video/mp4" />
          {/* <source src="https://rotato.netlify.app/alpha-demo-site/movie-webm.webm" type="video/mp4" /> */}
        </video>
      </div>
      <div className="flex flex-col max-sm:items-center max-sm:text-center">
        <div className="mb-4 inline-flex w-fit items-center gap-1 border border-[#ffffff2d] p-1">
          <div>
            <svg
              width="30"
              height="31"
              viewBox="0 0 30 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1758_428)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15 0.5C23.2849 0.5 30 7.21515 30 15.5C30 23.7849 23.2849 30.5 15 30.5C6.71514 30.5 0 23.7849 0 15.5C0 7.21515 6.71514 0.5 15 0.5Z"
                  fill="#F0B90B"
                />
                <path
                  d="M8.24399 15.5001L8.25481 19.4665L11.625 21.4497V23.7718L6.28245 20.6384V14.3403L8.24399 15.5001ZM8.24399 11.5338V13.8451L6.28125 12.684V10.3727L8.24399 9.21167L10.2163 10.3727L8.24399 11.5338ZM13.0325 10.3727L14.9952 9.21167L16.9675 10.3727L14.9952 11.5338L13.0325 10.3727Z"
                  fill="white"
                />
                <path
                  d="M9.66235 18.6444V16.3223L11.6251 17.4833V19.7946L9.66235 18.6444ZM13.0325 22.2814L14.9953 23.4425L16.9676 22.2814V24.5927L14.9953 25.7538L13.0325 24.5927V22.2814ZM19.7825 10.3727L21.7453 9.21167L23.7176 10.3727V12.684L21.7453 13.8451V11.5338L19.7825 10.3727ZM21.7453 19.4665L21.7561 15.5001L23.7188 14.3391V20.6372L18.3763 23.7706V21.4485L21.7453 19.4665Z"
                  fill="white"
                />
                <path
                  d="M20.3377 18.6444L18.375 19.7946V17.4833L20.3377 16.3223V18.6444Z"
                  fill="white"
                />
                <path
                  d="M20.3378 12.3557L20.3487 14.6778L16.9688 16.661V20.637L15.0061 21.7872L13.0434 20.637V16.661L9.66356 14.6778V12.3557L11.6347 11.1947L14.9941 13.1875L18.3739 11.1947L20.3462 12.3557H20.3378ZM9.66235 8.39057L14.9953 5.24634L20.3378 8.39057L18.3751 9.55163L14.9953 7.55884L11.6251 9.55163L9.66235 8.39057Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_1758_428">
                  <rect
                    width="30"
                    height="30"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div>BINANCE SMART CHAIN</div>
        </div>
        <div className="text-3xl font-semibold leading-10 tracking-[-1.2px] md:text-6xl md:leading-[72px] lg:max-w-[424px] lg:text-3xl xl:text-6xl">
          AVIATRIX CHAMPIONSHIP PASS
        </div>
        <div className="mt-[15px] font-medium uppercase opacity-80 max-sm:mb-4 lg:max-w-[312px]">
          <p>EACH PASS GETS YOU 3 LOGIN CODES</p>
          <p>You get 2 hours of play session per login code</p>{" "}
        </div>
      </div>
    </div>
  );
}
