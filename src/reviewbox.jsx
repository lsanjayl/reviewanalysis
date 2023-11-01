const Reviewbox=({post,setPost,handleSubmit})=>{
  
    return(
        <div>
         
        <section className='w-full max-w-full flex-start flex-col form' >
        <p className='head_text orange_gradient'>
        Test it out..
    </p>
      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold  text-white text-base text-gray-700'>
            Your review
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your review here'
            required
            className='form_textarea'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold  text-white text-base text-gray-700'>
            Field of review{" "}
            <span className='font-normal  text-white'>
              (#product, #review, #ecommerce, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>

          <button
          type='submit'
            className='btn btn-sm glass analysis'
          >
            Submit
          </button>
        </div>
      </form>
      
    </section>


    </div>
    )
}
export default Reviewbox;