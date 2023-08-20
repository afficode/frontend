import React from "react";

const Privacy = () => {
  return (
    <div className="flex flex-col mt-5 divide-gray-300  items-start justify-start w-full md:w-[70%] mx-auto">
      <h1 className="text-4xl tracking-wide font-bold my-3 p-2">
        Privacy Settings
      </h1>
      <hr className="bg-gray-500 mx-auto w-full my-2 md:w-[70%]" />
      <table className="table-auto w-full">
        <tbody>
          <tr className="">
            <td className="text-xl font-bold">Your Activity</td>
            <td className="text-lg text-justify mr-2">
              Mange profile and activity who can see your posts, adverts etc.
            </td>
            <td>
              <form action="">
                <select
                  name="activityVisibility"
                  id=""
                  className="border-gray-400 border-2"
                >
                  <option value="everyone">Everyone</option>
                  <option value="customers">My Customers</option>
                  <option value="none">No One</option>
                </select>
              </form>
            </td>
          </tr>
          <tr>
            <td className="text-xl font-bold">
              Help people find and contact you
            </td>
            <td className="text-lg text-justify mr-2">
              Who can connect with you, who can look you up using your phone
              number and email.
            </td>
            <td>
              <form action="">
                <select
                  name="activityVisibility"
                  id=""
                  className="border-gray-400 border-2 gap-4"
                >
                  <option value="everyone">Everyone</option>
                  <option value="customers">My Customers</option>
                  <option value="none">No One</option>
                </select>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Privacy;
