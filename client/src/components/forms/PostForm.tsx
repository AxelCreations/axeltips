import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import FileBase64 from 'react-file-base64';

import Button from '@/components/buttons/Button';
import InputGroup from '@/components/inputs/InputGroup';
import { PostModel, PostModelType } from '@/lib/models/PostModel';
import { useAppDispatch } from '@/hooks/ReduxHooks';
import { addPostAction, editPostAction } from '@/redux/actions/posts';

type PostFormProps = {
  post?: PostModelType | null;
  setCurrentId: Dispatch<SetStateAction<string | undefined>>;
}

const PostForm = ({ post = null, setCurrentId }: PostFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [tagList, setTagList] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>('');

  const dispatch = useAppDispatch();
  const { register, setValue, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<PostModelType>(PostModel.resolver);

  useEffect(() => {
    setValue('_id', post?._id ?? '');
    setValue('title', post?.title ?? '');
    setValue('message', post?.message ?? '');
    setValue('creator', post?.creator ?? '');
    setValue('selectedFile', post?.selectedFile ?? '');
    setTagList(post?.tags ?? []);
  }, [post, setValue]);

  useEffect(() => {
    setValue('tags', tagList);
  }, [setValue, tagList]);

  const handleTagsChange = (value: string, add = true) => {
    if (!Boolean(value.length)) {
      return;
    }

    if (add) {
      setTagList(tags => {
        return tags.includes(value) ? tags : [...tags, value];
      })
    } else {
      setTagList(tags => {
        return tags.filter((t) => t !== value);
      });
    }
  }

  const onSubmitForm: SubmitHandler<PostModelType> = async (values) => {
    try {
      const parsedValues = PostModel.schema.parse(values);

      if (!post?._id) {
        await dispatch(addPostAction(parsedValues));
      } else {
        await dispatch(editPostAction(parsedValues));
      }

      resetFormState();
    } catch (err: AxiosError | unknown | any) {
      let errorMessage = 'Error saving data.';

      const { response: { data } } = err;

      if (!!data) {
        errorMessage = data.errors[0];
      }

      setError('root', {
        type: "manual",
        message: errorMessage,
      });
    }
  }

  const onClearForm = () => {
    resetFormState();
  }

  const resetFormState = () => {
    setCurrentId('');
    post = null;
    setTagList([]);
    setCurrentTag('');
    if (!!fileInputRef.current) {
      console.log({ fileInputRef });
      fileInputRef.current.value = '';
      fileInputRef.current.files = null;
    }
  }

  const onInputFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;

    if (Boolean(files?.length)) {
      console.log({ files });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className='flex flex-col flex-grow gap-3'>
      <InputGroup id="title" label="Title" error={errors?.title?.message}>
        <input
          id='title'
          className='input input-md input-bordered w-full'
          placeholder='Title'
          {...register('title')} />
      </InputGroup>

      <InputGroup id="message" label="Message" error={errors?.message?.message}>
        <input
          id='message'
          className='input input-md input-bordered w-full'
          placeholder='Message'
          {...register('message')} />
      </InputGroup>

      <InputGroup id="creator" label="Creator" error={errors?.creator?.message}>
        <input
          id='creator'
          className='input input-md input-bordered w-full'
          placeholder='Creator'
          {...register('creator')} />
      </InputGroup>

      <InputGroup id="tags" label="Tags" error={errors?.tags?.message}>
        {tagList.length > 0 &&
          (<div className="flex gap-2 p-1 mb-2">
            {tagList.map(tag => (
              <span
                key={tag}
                className='badge badge-accent pe-3 cursor-pointer'
                onClick={() => { handleTagsChange(tag, false) }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                {tag}
              </span>
            ))}
          </div>)
        }
        <div className="flex gap-2">
          <input
            id='tags'
            className='input input-md input-bordered w-full'
            placeholder='Tags'
            value={currentTag}
            onChange={e => setCurrentTag(e.target.value)} />
          <span className='btn btn-primary' onClick={() => { handleTagsChange(currentTag) }}>+</span>
        </div>

        <input type='hidden' placeholder='Tags' {...register('tags')} />
      </InputGroup>

      <InputGroup id="file-upload-button" label="Selected File" error={errors?.selectedFile?.message}>
        <div className="input input-bordered p-0 flex items-center [&>*]:w-full [&>*]:cursor-pointer">
          <input
            type='file'
            ref={fileInputRef}
            onChange={e => { onInputFileChange(e) }}
          />
        </div>
        <input type='hidden' {...register('selectedFile')} />
      </InputGroup>

      {Boolean(post?._id?.length) && (<input type='hidden' placeholder='CurrentId' {...register('_id')} />)}

      <div className="flex justify-between mt-5">
        <Button
          className='btn-neutral w-[35%]'
          type="reset"
          disabled={isSubmitting}
          onClick={onClearForm}>
          Cancel
        </Button>
        <Button
          className='w-[60%]'
          type="submit"
          disabled={isSubmitting}>
          {isSubmitting ? ('Waiting...') : !post?._id ? 'Create' : 'Edit'}
        </Button>
      </div>
    </form>
  )
}

export default PostForm;
