import { useCallback } from "react";
import { Formik } from "formik";
import { getEditSchema } from "utils/validation/yupEdit";

import { useAddGoodsMutation } from "redux/services/goodsApi";

const Add = () => {
  const schema = getEditSchema();

  const [addGoods, { isLoading: isAddGoodsLoading }] = useAddGoodsMutation();
  const handleSubmit = useCallback(async (values) => {
    try {
      await addGoods({
        name: values.name
      }).unwrap();

      // console.log(data);

      // if (error) {
      //   const errorData = error.data.errors[0];
      //   setErrors({
      //     name: errorData.name
      //   });
      //   return;
      // }

      // if (data) {
      //   console.log(data);
      // }
    } catch (e) {
      console.log("Unhandled registration error :", e);
    }
  }, []);

  const isLoading = isAddGoodsLoading;

  return (
    <>
      <h2 className="h2 mb-3">Add Item</h2>

      <Formik
        validateOnChange
        enableReinitialize
        initialValues={{
          name: ""
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, status }) => (
          <form
            className="form"
            onSubmit={handleSubmit}>
            {status && <div className="alert">{status}</div>}

            <div className="d-flex align-items-end mb-4">
              <div className="form-group position-relative">
                <div className="position-relative">
                  <label className="form-label">Add item</label>
                  <input
                    type="text"
                    name="name"
                    placeholder=""
                    className={`
                      form-control
                      ${touched.name ? "is-touch " : ""}
                      ${errors.name && touched.name ? " is-invalid" : ""}
                    `}
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && touched.name && <div className="text-danger">{errors.name}</div>}
              </div>

              <button
                type="submit"
                className="btn btn-success"
                disabled={!isValid || !values.name || isLoading}>
                {isLoading ? <>Loading ....</> : null}
                <span>+ Add</span>
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Add;
