'use client'
import Image from "next/image";
import React, { useState } from 'react';



export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const callApi = async () => {
    const url = 'your-api-key-here';
    const data = { prompt: inputValue };2

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();

      if (result.image) {
        const base64Image = `data:image/png;base64,${result.image}`;
        setImageUrl(base64Image);
      } else {
        throw new Error('No image data received from the API');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setError('Failed to generate image. Please try again.');
      setImageUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `generated_image_${inputValue}.png`;
    link.click();
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 dark: bg-transparent transition-colors duration-500">
    {/* Solo-Fusion Heading */}
    <h1 className="text-center mb-10 text-gray-900 dark:text-white">
<span className="text-4xl font-extrabold">Solo-fusion</span>
<span className="block text-xl font-normal">Your Image Generating AI</span>
</h1>

    <div className="flex justify-between max-w-5xl w-full">
      {/* Left Section: Stable Diffusion Info */}
      <div className="flex-1 max-w-[22%] bg-white/40 dark:bg-gray-800/40 backdrop-blur-md p-4 rounded-lg shadow-lg space-y-4">
        <h2 className="text-lg font-extrabold mb-3 text-gray-800 dark:text-gray-100">
          ֎ What is Stable Diffusion?
        </h2>
        <div className="space-y-2">
          <div className="border border-solid bg-gray-300 dark:bg-gray-700 p-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-200 hover:border-blue-400 dark:hover:bg-gray-600">
            🖼️ Generate high-quality images from text prompts.
          </div>
          <div className="border border-solid bg-gray-300 dark:bg-gray-700 p-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-200 hover:border-blue-400 dark:hover:bg-gray-600">
            🧠 Built using advanced AI models trained on vast datasets.
          </div>
          <div className="border border-solid bg-gray-300 dark:bg-gray-700 p-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-200 hover:border-blue-400 dark:hover:bg-gray-600">
            🔍 Allows creative exploration of ideas.
          </div>
          <div className="border border-solid bg-gray-300 dark:bg-gray-700 p-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-200 hover:border-blue-400 dark:hover:bg-gray-600">
            🎨 Customize and fine-tune outputs for unique visuals.
          </div>
          <div className="border border-solid bg-gray-300 dark:bg-gray-700 p-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-200 hover:border-blue-400 dark:hover:bg-gray-600">
            🚀 Quickly generate multiple variations in seconds.
          </div>
        </div>
      </div>

      {/* Main Content: Image Generation */}
      <div className="flex-1 mx-4 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md p-6 rounded-lg shadow-lg flex flex-col justify-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your prompt..."
          className="w-full p-3 rounded-lg mb-4 transition-colors duration-500 bg-gray-200 text-gray-800 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-300"
        />
        <button
          onClick={callApi}
          className={`w-full py-3 font-semibold rounded-lg transition duration-300 
          ${isLoading ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Image'}
        </button>

        {isLoading && (
          <div className="flex justify-center mt-4">
            <div className="loader border-t-transparent border-solid border-blue-500 animate-spin rounded-full border-4 h-10 w-10"></div>
          </div>
        )}

        {imageUrl && (
          <div className="mt-8 text-center">
            <h2 className="text-xl mb-4 text-gray-900 dark:text-white">
              Generated image of: {inputValue}
            </h2>
            <div className="relative border-4 border-gray-300 dark:border-gray-600 border-double rounded-lg shadow-xl overflow-hidden mx-auto max-w-[45vw]">
              <img
                src={imageUrl}
                alt={`Generated image of ${inputValue}`}
                className="w-full h-auto"
              />
            </div>
            <button
              onClick={downloadImage}
              className="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg text-lg transition duration-300"
            >
              Download Image
            </button>
          </div>
        )}

        {error && (
          <div className="text-red-500 mt-4 text-center">
            {error}
          </div>
        )}
      </div>

      {/* Right Section: Stable Diffusion Benefits */}
      <div className="flex-1 max-w-[22%] bg-white/40 dark:bg-gray-800/40 backdrop-blur-md p-4 rounded-lg shadow-lg space-y-4">
        <h2 className="text-lg font-extrabold mb-3 text-gray-800 dark:text-gray-100">
          ֎ Why Use Stable Diffusion?
        </h2>
        <div className="space-y-2">
          <div className="border border-solid bg-gray-300 dark:bg-gray-700 p-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-200 hover:border-blue-400 dark:hover:bg-gray-600">
            🖌️ Create diverse visual styles with minimal effort.
          </div>
          <div className="border border-solid bg-gray-300 dark:bg-gray-700 p-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-200 hover:border-blue-400 dark:hover:bg-gray-600">
            💼 Ideal for designers, artists, and developers.
          </div>
          <div className="border border-solid bg-gray-300 dark:bg-gray-700 p-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-200 hover:border-blue-400 dark:hover:bg-gray-600">
            🌐 Used in creative industries, media, and content creation.
          </div>
          <div className="border border-solid bg-gray-300 dark:bg-gray-700 p-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-200 hover:border-blue-400 dark:hover:bg-gray-600">
            🏞️ Enables rapid prototyping and iteration on designs.
          </div>
          <div className="border border-solid bg-gray-300 dark:bg-gray-700 p-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-200 hover:border-blue-400 dark:hover:bg-gray-600">
            🔥 Open-source, fast, and efficient image generation tool.
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}





