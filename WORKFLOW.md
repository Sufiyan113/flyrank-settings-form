# AI-Assisted Development Workflow Comparison

## Feature Implemented

The feature selected for this assignment was a React Settings Form with client-side validation. The form includes fields for Full Name, Email, Password, Theme Selection, Notification Preferences, and Terms & Conditions. Validation was implemented to ensure required fields are completed correctly before submission.

---

## Round 1 – Vague Prompt

The first version was generated using a simple prompt with minimal instructions, asking the AI to build a React settings form. The generated code produced a functional interface but lacked several important qualities.

Issues found during review included:

- Missing accessibility attributes such as `aria-invalid` and `aria-describedby`.
- Weak validation logic with limited error handling.
- No automated tests.
- Inconsistent component structure.
- Some unnecessary re-rendering and repeated code.
- Error messages were not descriptive.

The review process required manually identifying these problems and making several corrections before the feature was acceptable.

---

## Round 2 – Precise Prompt

The second implementation used a detailed prompt describing the project structure, validation requirements, accessibility expectations, coding constraints, expected behaviour, and a verification step requesting tests.

This produced noticeably better results.

Improvements included:

- Proper controlled React components.
- Clear validation for every required field.
- Better accessibility using labels and ARIA attributes.
- Cleaner and more modular component structure.
- Automated tests using React Testing Library and Vitest.
- Improved user experience through clearer validation messages.

The generated code required fewer manual corrections and was easier to review.

---

## Comparison

Although writing the detailed prompt took more time initially, the total development time was lower because fewer issues needed to be fixed later. The second version also produced more maintainable and readable code.

The biggest difference was the reduction in review effort. Instead of fixing structural issues, the review focused mainly on verifying correctness and confirming expected behaviour.

---

## AI Mistake Caught

One issue produced by AI was incomplete accessibility support. Some validation messages were not correctly associated with their input fields, which would reduce usability for screen reader users. This was corrected by adding appropriate ARIA attributes and ensuring each error message was linked to its corresponding input.

---

## Conclusion

This exercise demonstrated that prompt quality directly affects implementation quality. A vague prompt generated usable but incomplete code, whereas a precise prompt with clear constraints, expected behaviour, verification requirements, and testing instructions produced a significantly higher-quality implementation that required less review effort and resulted in a more reliable final product.