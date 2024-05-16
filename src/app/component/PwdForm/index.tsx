import { Form, FormProps, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Password from 'antd/es/input/Password';

export const PwdForm: React.FC<FormProps> = props => {
  return (
    <Form
      labelCol={{
        span: 6
      }}
      labelAlign="left"
      {...props}
    >
      <FormItem
        name="password"
        label="密码"
        required
        rules={[
          {
            validator(rule, value) {
              if (!value) {
                return Promise.reject('请输入密码');
              }
              if (value.length < 6) {
                return Promise.reject('密码长度不能小于6');
              }
              if (value.length > 20) {
                return Promise.reject('密码长度不能大于20');
              }
              if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                return Promise.reject('密码只能包含字母、数字和下划线');
              }
              // 必须包含大小写字母、数字和特殊字符中的至少两种
              if (
                [/^[a-z]+$/, /^[A-Z]+$/, /^\d+$/, /^[^a-zA-Z0-9]+$/]
                  .map(reg => reg.test(value))
                  .some(Boolean)
              ) {
                return Promise.reject(
                  '密码必须包含大小写字母、数字和特殊字符中的至少两种'
                );
              }

              return Promise.resolve();
            }
          }
        ]}
      >
        <Password />
      </FormItem>
      <FormItem
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.password !== currentValues.password
        }
        style={{
          marginBottom: 0
        }}
      >
        {form => (
          <FormItem
            name="confirm"
            label="确认密码"
            required
            rules={[
              {
                validator(rule, value) {
                  if (value !== form.getFieldValue('password')) {
                    return Promise.reject('两次输入的密码不一致');
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Password />
          </FormItem>
        )}
      </FormItem>
    </Form>
  );
};
