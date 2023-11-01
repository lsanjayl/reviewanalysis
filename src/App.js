import './App.css';
import Reviewbox from './reviewbox';
import { useState } from 'react';
import log from './logo.png'

function App() {
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [res,setRes]=useState({stats:[],conclusion:[]});
  async function query2(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Tejas003/distillbert_base_uncased_amazon_review_sentiment_300",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }
  async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/LiYuan/amazon-review-sentiment-analysis",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(post);
    try {
        const promise =query({"inputs": post.prompt});
        const promise2=query2({"inputs": post.prompt});
promise.then(result => {
  // Accessing the nested objects
  const [data] = result;
  const totalScore = data.reduce((total, item) => total + item.score, 0);

const percentageData = data.map(item => ({
  label: item.label,
  percentage: (item.score / totalScore) * 100,
}));

setRes({...res,stats:percentageData});
console.log(promise)
});
promise2.then(result => {
  // Accessing the nested objects
  const [data] = result;
  const totalScore = data.reduce((total, item) => total + item.score, 0);

  const percentageData = data.map(item => ({
    label: item.label,
    percentage: (item.score / totalScore) * 100,
  }));

setRes({...res,conclusion:percentageData});
});
    } catch (error) {
      console.log(error);
    } finally {
    //   setIsSubmitting(false);
    }
  };
  return (
    <div>
      <div className="navbar bg-base-300 headbox">
  <a className="btn btn-ghost normal-case text-xl text-white">
    <img
    src={log}
    width={30}
    />
    reviewBOX</a>
</div>
    <div className='main'>
          <div className='gradient' />
        </div>
        <div class="lines">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
        <main className='app'>
          <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      One stop review clasifier
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> AI-Powered Analyser...</span>
    </h1>
    <p className='desc text-center'>
      reviewBOX is an AI powered review analysis tool for modern world to
      identify fake and potential positive and negative reviews
    </p>
  </section>
  <p className='mt-10 text-3xl text-white'>
     Get your api now!!
    </p>

    <div className="mockup-code mt-10 glass">
  <pre data-prefix="$"><code>const response = await fetch(</code></pre> 
  <pre data-prefix=">" className="text-warning"><code>"https://api-inference.reviewbox?api.req",</code></pre> 
  <pre data-prefix=">" className="text-success"><code>{"{"}</code></pre>
  <pre data-prefix=">" className="text-success"><code>headers: {"{"} Authorization: "Bearer {"{"}API_TOKEN {"}"}" {"}"},</code></pre>
  <pre data-prefix=">" className="text-success"><code>method: "POST",</code></pre>
  <pre data-prefix=">" className="text-success"><code>body: JSON.stringify(data),</code></pre>
  <pre data-prefix=">" className="text-success"><code>{"}"}</code></pre>
  <pre data-prefix=">"><code>);</code></pre>
  <pre data-prefix=">"><code>const result = await response.json();</code></pre>
</div>





    <Reviewbox
    post={post}
    setPost={setPost}
    handleSubmit={handleSubmit}
    />
    {(res.conclusion&&res.stats)&&
      <div className="stats bg-orange-600 text-primary-content analysis">
  {res&&res.conclusion.map((data)=>
      <div className="stat "key={data.label}>
        <div className="stat-title text-white">{data.label}</div>
        <div className="stat-value">{data.percentage.toFixed(5)}</div>
        <div className="stat-actions">
          {data.label=='LABEL_0'?<button className="btn btn-sm btn-error">Negative</button>:<button className="btn btn-sm btn-success">Positive</button>}
          
        </div>
      </div>
  )}
    </div>
      }
    <div className="stats shadow analysis headbox">
      
  {res&&res.stats.map((data)=>
<div className="stat text-white"key={data.label}>
<div className="stat-title text-white">{data.label}</div>
<div className="stat-value text-orange-600">{data.percentage.toFixed(2)}%</div>
</div>
  )}
</div>
        </main>    
        </div>
  );
}

export default App;
