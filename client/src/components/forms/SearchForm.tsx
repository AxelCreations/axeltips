import Button from '@/components/buttons/Button';
import InputGroup from '@/components/inputs/InputGroup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type SearchType = {
  title: string;
  creator: string;
}

const SearchForm = () => {
  const { register, setValue } = useForm<SearchType>();

  const router = useRouter();

  useEffect(() => {
    const { title, creator } = router.query;
    setValue('title', title as string);
    setValue('creator', creator as string);
  }, [router.query, setValue]);

  return (
    <form className='flex flex-col flex-grow gap-3'>
      <InputGroup id="title" label="Title">
        <input 
          className='input input-md input-bordered w-full'
          placeholder='By Title'
          {...register('title')} />
      </InputGroup>
      <InputGroup id="creator" label="Creator">
        <input
          className='input input-md input-bordered w-full'
          placeholder='By Title'
          {...register('creator')} />
      </InputGroup>
      <div className="flex justify-between mt-5">
        <Button className='btn-neutral w-[35%]' type="reset">Cancel</Button>
        <Button className='w-[60%]' type="submit">Search</Button>
      </div>
    </form>
  )
}

export default SearchForm;