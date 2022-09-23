import { extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import { messages } from "vee-validate/dist/locale/en.json";

// import { extend } from "vee-validate/dist/vee-validate.full";

// let errorMessage =
//   " min length 8 chars, and must include 1 lower-case, upper-case, numeral and special character (#!@$%^*-)";
// extend("customPassword", {
//   message: () => "The " + errorMessage,
//   validate: (value) => {
//     let regex =
//       /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–{}:;,?/*~$^+=<>.]).{6,32}$/;
//     // let containsRequiredChars = regex.test(value);
//     if (regex.test(value)) {
//       return true;
//     } else {
//       errorMessage =
//         " min length 8 chars, and must include 1 lower-case, upper-case, numeral and special character ($@$!%*#?&)";
//       return false;
//     }
//   },
// });
// // debugger;
// console.log(errorMessage);

export default function () {
  Object.keys(rules).forEach((rule) => {
    extend(rule, {
      ...rules[rule],
      message: messages[rule],
    });
  });
}
