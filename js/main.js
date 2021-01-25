'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');
  const text = document.getElementById('text');
  const comment = document.querySelector('#text > p')

  const quizSet = shuffle([
    //choices の正解がインデックスの0番目にする。
    {q: '創設された年は?', c: ['1902年', '1968年', '1994年'], t: '実に119年もの歴史があり,初期のクラブ名は「マドリード・フットボール・クラブ」という名だった。'},
    {q: 'ホームスタジアムの名前は?', c: ['サンティアゴ・ベルナベウ', 'アンフィールド', 'カンプ・ノウ'], t: '開場は1947年12月14日で収容人数は81,044人。'},
    {q: 'リーグ優勝した回数は?', c: ['34', '22', '13'], t: 'クラブ別成績で見ると歴代1位。ちなみに2位はバルセロナで26回。'},
    {q: 'どこの国のクラブチーム?', c: ['スペイン', 'イングランド', 'イタリア'], t: 'クラブ名のとおり「マドリード」はスペインの首都。スペインの象徴のひとつである。'},
    {q: '現在のキャプテンは?', c: ['セルヒオ・ラモス', 'マルセロ', 'カリム・ベンゼマ'],t: 'キャプテンを務めて6年目になる。彼のプレースタイルを見て嫌うアンチも多いが、実力はトップクラス。'},
    {q: '現在の背番号7の選手は?', c: ['エデン・アザール', 'クリスティアーノ・ロナウド', 'キリアン・ムバッペ'], t: '長年背負ってきたクリスティアーノ・ロナウドのイメージが強いが彼が退団してもう3年が経とうとしている。'},
    {q: '現在の監督の名前は?', c: ['ジネディーヌ・ジダン', 'ディエゴ・シメオネ', 'ユルゲン・クロップ'], t: '特別な戦術は持ち合わせていないが、選手の良さを引き出す能力、選手起用のセンス、試合の流れを読む力など別格のカリスマ性を発揮し数々のタイトルをクラブにもたらしてきた名将。'},
    {q: '永遠のライバルと言われているクラブチームは?', c: ['バルセロナ', 'マンチェスター・ユナイテッド', 'バイエルン・ミュンヘン'], t: 'この両者の試合をスペイン語で「エル・クラシコ」訳すと「伝統の一戦」と呼ばれ、世界中のサッカーファンが熱狂する。ちなみに過去の対戦成績はほぼ互角。'},
    {q: 'チームカラーは?', c: ['ホワイト', 'グリーン', ' ブルー'], t: 'その白いチームカラーからエル・ブランコ（白色）やメレンゲの愛称で親しまれ、トップクラスの選手が多く在籍し数々のビックタイトルを獲得している。'},
    {q: '2019年に入団した日本人選手は?', c: ['久保建英', '本田圭佑', '中井卓大'], t: 'トップチームに初の日本人が入団したことで話題になった。現在は同じスペインのクラブであるヘタフェにレンタル移籍している。ちなみに選択肢で登場した中井卓大選手は2014年から下部組織に所属している。'},
  ]);
  //何問目のクイズを解いているかを変数で持つ。
  let nowQuestion = 0;
  //回答したか否かの変数。
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
       //ランダムに選ぶ範囲の終点のインデックスを i という変数にする。
        //要素の数 - 1 とすることで、最後のインデックス番号となる。
                                //i が 0 より大きい間 i を 1 ずつ減らしながら処理
    for (let i = arr.length - 1; i > 0; i--) {
      //ランダムに選ぶ要素のインデックスを j にする。変数でランダムな整数値を作る場合は i に対して + 1 とする。
      const j = Math.floor(Math.random() * (i + 1));
  
      //分割代入で配列の順番を入れ替えて、シャッフル完了。
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }

    //引数に配列を渡したら、その配列をシャッフルして返してあげる。
    return arr;
  }
   
  //正誤判定処理
  function checkAnswer(li) {
    //一度回答済みなら処理を止める。
    if (isAnswered === true) {
      return;
    }
    //回答したら
    isAnswered = true;
    //c の最初の要素と一緒だったら正解にする。
    if (li.textContent === quizSet[nowQuestion].c[0]) {
      li.classList.add('correct');
      li.textContent = li.textContent + '...正解!!'
      score++;
    } else {
      li.classList.add('wrong');
      li.textContent = li.textContent + '...残念。正解は[' + quizSet[nowQuestion].c[0] + ']';
    }

    text.classList.remove('hidden');
    btn.classList.remove('disabled');
  }

  function setQuiz() {
    //回答前の処理
    isAnswered = false;

      //quizSet の nowQuestion 番目の q に置き換えて、問題文を表示。
    question.textContent = quizSet[nowQuestion].q;
    comment.textContent = quizSet[nowQuestion].t;

    //li 要素がなくなるまでループ処理が実行される。
    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }
                                   //スプレット構文と [] で囲むと元の選択肢の配列はそのままに、シャッフルされた配列が新しく作られる。
    const shuffledChoices = shuffle([...quizSet[nowQuestion].c]);
    
    //答えの選択肢を forEach で作成。
    shuffledChoices.forEach(choice => {
      //li 要素を作成。
      const li = document.createElement('li');
      //li 要素に選択肢１つずつ代入。
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      //li を choices(ul) の子要素に配置する。
      choices.appendChild(li);
    });

    //最後の問題文の時のボタんテキストを変更する。
    if (nowQuestion === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    //disabled がついていたら、後の処理を実行させない。
    if (btn.classList.contains('disabled')) {
      return;
    }
    //次の問題へ進む時に、再度 disabled クラスをつけてあげる。
    btn.classList.add('disabled');

    if (nowQuestion === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      nowQuestion++; //次の問題へ進む
      setQuiz();
    }

    text.classList.add('hidden');
    
  });
}