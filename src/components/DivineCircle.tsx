import { Link } from "react-router-dom";

const DivineCircle = () => {
  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Header */}
        <p className="font-serif text-6xl md:text-8xl font-bold text-[#C8A96E] mb-8 tracking-widest">
          XII
        </p>
        <div className="w-12 h-px bg-[#C8A96E] mx-auto mb-8" />
        <p className="text-sm tracking-[0.3em] uppercase text-[#C8A96E] mb-12 font-medium">
          THE 12 · THE SACRED LINE
        </p>

        {/* Description */}
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed mb-16 text-left">
          <p>
            The 12 is not a product line. It is a covenant. Twelve pieces. Twelve holders. The number twelve appears across every sacred tradition in human history — twelve apostles, twelve tribes, twelve months, twelve signs. It is the number of completion. Of covenant. Of being chosen.
          </p>
          <p>
            The Collection Box is not available to browse. It exists for those who are already in the world of Scriptured. Each box is numbered. Each piece is singular. The NFC-embedded plate inside is the key to its digital twin — a record that cannot be duplicated.
          </p>
          <p className="font-serif text-xl text-white font-bold">
            You do not discover The 12. You are found by it.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-12 mb-12">
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Applications are reviewed. Not everyone is selected. No timelines are given.
          </p>
          <Link
            to="/application"
            className="inline-block border border-[#C8A96E] text-[#C8A96E] text-xs tracking-[0.25em] uppercase px-10 py-4 hover:bg-[#C8A96E] hover:text-black transition-all duration-300 font-medium"
          >
            Request an Invitation
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-600 tracking-[0.15em] uppercase">
          Not everyone is called. The 12 know who they are.
        </p>

      </div>
    </section>
  );
};

export default DivineCircle;
