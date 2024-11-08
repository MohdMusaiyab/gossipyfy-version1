"use client"
import React from 'react';
import SingleVoiceNote from '@/app/components/Notes/SingleVoiceNote';
import { useParams } from 'next/navigation'; // Hook for query params

const Page = () => {
  
  const {id} = useParams();

  
  return (
    <div>
      {id ? (
        <SingleVoiceNote noteId={id as string} /> // Cast id as string
      ) : (
        <p>No note ID provided</p> 
      )}
    </div>
  );
};

export default Page;
