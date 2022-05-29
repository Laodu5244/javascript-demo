$(function() {
  let defaultDate = new Date(2022, 0);
  let box = $('#box');
  let yearMonthDiv = null;
  let prevMonth = null;
  let nextMonth = null;
  let tBody = null;
  let allTd = [];
  create();
  showDate();

  // 显示当前日期对应的日历
  function showDate() {
    let year = defaultDate.getFullYear(); // 年
    let month = defaultDate.getMonth() + 1; // 月
    yearMonthDiv.text(year + '年' + month + '月')
    // 获取1号是星期几
    let week = new Date(year, month - 1, 1).getDay();
    // 获取本月的最后一天是几号,表示本月有多少天
    let days = new Date(year, month, 0).getDate();

    let n = 1;
    for (let i = 0; i < allTd.length; i++) {
      allTd[i].empty() // empty(): 清空数组
      if (i >= week && n <= days) {
        allTd[i].text(n);
        n++;
      }
    }
    if (allTd[35].text()==='') {
    	allTd[35].parent().hide()
    }else{
    	allTd[35].parent().show()
    }
  }

  $('#box span').click(function() {
    let year = defaultDate.getFullYear(); // 年
    let month = defaultDate.getMonth(); // 月
    if ($(this).index() == 0) {
      month--; // 上一月 
    } else {
      month++; // 下一月
    }
    defaultDate = new Date(year, month);
    showDate();
  })

  // 创建静态布局
  function create() {
    let header = $(`
	  <header>
		<span class="fl">上个月</span>	
		<div class="ym">2022年1月</div>
		<span class="fr">下个月</span>
	  </header>`);
    box.append(header);
    yearMonthDiv = header.find('.ym');
    prevMonth = header.find('.fl');
    nextMonth = header.find('.fr');

    let table = $(`
    <table cellpadding="0" cellspacing="0">
		  <thead>
		  <tr>
		  <th class="red">周日</th>
				<th>周一</th>
				<th>周二</th>
				<th>周三</th>
				<th>周四</th>
				<th>周五</th>
				<th>周六</th>
			</tr>
		  </thead>
		  <tbody>
		  </tbody>
	  </table>`);
    box.append(table);
    tBody = table.find('tbody');

    for (let i = 0; i < 6; i++) {
      let tr = $('<tr></tr>');
      for (let j = 0; j < 7; j++) {
        let td = $('<td></td>');
        tr.append(td);
        allTd.push(td);
      }
      tBody.append(tr)
    }
  }
})