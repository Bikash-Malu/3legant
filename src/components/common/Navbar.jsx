
import { Link } from "react-router-dom";


export default function Navbar() {

  return (
    <div>
      {/* Top Banner */}
      <div className="bg-gray-100 text-blue-900 text-center py-2 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex justify-center items-center">
          <span>30% off storewide — Limited time!</span>
          <Link to="/shop" className="text-blue-800 font-semibold hover:underline">
            Shop Now &rarr;
          </Link>
        </div>
      </div>

   
    </div>
  );
}
