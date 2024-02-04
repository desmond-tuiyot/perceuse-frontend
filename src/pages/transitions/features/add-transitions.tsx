import React from 'react'
import { Select, Button, Form } from 'antd'

import { DanceMoveItem, DanceSelectFieldType } from '../entities'
import useAddTransition from '../services/add-transition.api'
import useGetTransitions from '../services/get-transitions.api'
import useGetDanceSelectItems from '../services/get-dance-select-items'

import styles from './add-transitions.module.css'

/**
 * Renders a form to add a transition between two dance moves
 */
const AddTransitions: React.FC = () => {
  const addTransition = useAddTransition()
  const transitionsHook = useGetTransitions()
  
  const [form] = Form.useForm<DanceSelectFieldType>()
  const { itemsList1, itemsList2 } = useGetDanceSelectItems({
    form,
    item1Id: 'danceMove1',
    item2Id: 'danceMove2'
  })
  
  const handleFinish = async (values: DanceSelectFieldType): Promise<void> => {
    await addTransition.call({
      danceMove1Id: values.danceMove1,
      danceMove2Id: values.danceMove2
    })
    await transitionsHook.refetch()
    form.resetFields()
  }

  const filterOption = (input: string, option?: DanceMoveItem) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  return (
    <div className={styles.container}>
      <Form form={form} onFinish={handleFinish}>
        <Form.Item<DanceSelectFieldType> name='danceMove1' label='Dance Move 1'>
          <Select showSearch filterOption={filterOption} options={itemsList1} />
        </Form.Item>
        <Form.Item<DanceSelectFieldType> name='danceMove2'  label='Dance Move 2'>
          <Select showSearch filterOption={filterOption} options={itemsList2} />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' size='large' className={styles.submitButton} loading={addTransition.loading} type='primary'>
            Add Transition
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddTransitions