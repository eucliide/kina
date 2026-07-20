export function WaitingCard() {
  return (
    <div
      className="
        mt-10
        w-full
        max-w-md
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-6
        text-center
      "
    >

      <div className="
        mx-auto
        h-12
        w-12
        rounded-full
        bg-white/10
      " />


      <h3 className="
        mt-5
        text-lg
        font-medium
      ">
        Waiting for others
      </h3>


      <p className="
        mt-2
        text-sm
        text-white/50
      ">
        The conversation will start when everyone is ready.
      </p>


    </div>
  );
}
