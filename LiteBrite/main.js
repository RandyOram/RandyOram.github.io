function main()
{
  var colorClass = '';
  $('.select-color').on('click',function()
  {
    var selectedColor = $(this).attr('class');
    switch (selectedColor)
    {
      case 'select-color cyan not-selected':
        $(this).toggleClass('select-color.cyan');
        colorClass = 'cyan';
        break;
        
      case 'select-color yellow not-selected':
        $(this).toggleClass('select-color.yellow');
        colorClass = 'yellow';
        break;
        
      case 'select-color magenta not-selected':
        $(this).toggleClass('select-color.magenta');
        colorClass = 'magenta';
        break;
    }
    $(this).siblings().removeClass('select-color.cyan');
    $(this).siblings().removeClass('select-color.yellow');
    $(this).siblings().removeClass('select-color.magenta');
    $(this).siblings().addClass('not-selected');
    $(this).removeClass('not-selected');
  });
  
  $('.box').on('click',function()
  {
    $(this).removeClass('cyan');
    $(this).removeClass('magenta');
    $(this).removeClass('yellow');
    $(this).toggleClass(colorClass);
  });
  
  var intervalID = 0;
  
  $('.toggle-blink').on('click',function()
  {
    if (colorClass)
    {
     	if (intervalID !== 0)
      {
        clearInterval(intervalID);
        intervalID = 0;
      }
      else
      {
      	$(this).toggleClass('opacity');
        intervalID = setInterval(function()
        {
          $('.box.cyan').toggleClass('blink');
          $('.box.yellow').toggleClass('blink');
          $('.box.magenta').toggleClass('blink');
        }, 350); 
      }
    }
  });
}

$(document).ready(main);
