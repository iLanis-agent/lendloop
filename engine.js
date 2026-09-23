/* LendLoop engine - pure loan tracking math, shared by app.html and node tests. */
(function(root, factory){
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.LendLoopEngine = factory();
})(typeof self !== 'undefined' ? self : this, function(){

  var DAY = 86400000;

  function dueMs(lentMs, lendDays){
    return lentMs + lendDays * DAY;
  }

  /* whole days from lent date to now (floor) */
  function daysOut(lentMs, nowMs){
    return Math.max(0, Math.floor((nowMs - lentMs) / DAY));
  }

  /* whole days until due; negative when overdue */
  function daysUntilDue(lentMs, lendDays, nowMs){
    return Math.ceil((dueMs(lentMs, lendDays) - nowMs) / DAY);
  }

  /* status: on_track | due_soon (<=2 days left) | overdue */
  function status(lentMs, lendDays, nowMs){
    var left = daysUntilDue(lentMs, lendDays, nowMs);
    if (left < 0) return {key:'overdue', label:'overdue', left:left};
    if (left <= 2) return {key:'due_soon', label:'due soon', left:left};
    return {key:'on_track', label:'out there', left:left};
  }

  function fmtDays(n){
    n = Math.abs(n);
    return n === 1 ? '1 day' : n + ' days';
  }

  /* gentle reminder text; tone: 'friendly' | 'direct' */
  function nudge(item, borrower, tone, overdueDays){
    var it = item.trim(), b = borrower.trim();
    if (tone === 'direct'){
      if (overdueDays > 0)
        return 'Hey ' + b + ' - my ' + it + ' was due back ' + fmtDays(overdueDays) + ' ago. When can I grab it?';
      return 'Hey ' + b + ' - quick reminder that my ' + it + ' is due back soon. Thanks!';
    }
    if (overdueDays > 0)
      return 'Hey ' + b + '! No rush, but I could use my ' + it + ' back when you get a chance - it is about ' + fmtDays(overdueDays) + ' past due. Thanks!';
    return 'Hey ' + b + '! Just a heads up that my ' + it + ' is coming due soon - no stress, whenever works. Thanks!';
  }

  /* sort: most overdue first, then soonest due */
  function byUrgency(a, b){
    var la = daysUntilDue(a.lentMs, a.lendDays, a.nowMs);
    var lb = daysUntilDue(b.lentMs, b.lendDays, b.nowMs);
    return la - lb;
  }

  return {DAY:DAY, dueMs:dueMs, daysOut:daysOut, daysUntilDue:daysUntilDue, status:status, fmtDays:fmtDays, nudge:nudge, byUrgency:byUrgency};
});
