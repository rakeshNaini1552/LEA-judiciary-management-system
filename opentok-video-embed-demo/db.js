
  
 
  let DB = {
  
    
    meetings: [],
    embed_code: ""
  };

  DB.meetings_get = function (id) {
    
    return this.meetings.find(m => m.id === id) || null;
  }
  
  
  DB.meetings_put = function (new_meeting) {
    const key = this.meetings.findIndex(m => m.id === new_meeting.id);
    if (key < 0) {
      this.meetings.push(new_meeting);
    } else {
      this.meetings[key] = new_meeting;
    }
  }
  
  
let sort = m_list => {
    return m_list.sort(function (a, b) {
      return a.start_time > b.start_time;
    });
  }
  
  /**
   * Filters through given list of meetings and split it into upcoming and current meetings based on time.
   *
   * @param {null|boolean} is_booked - If `null` or `undefined`, filter on all items in `mlist`. If true, filter only on
   * meetings that are booked. If false, filter only on meetings that have not been booked.
   * @return {object} Object containing `upcoming` and `current` meetings
   */
  DB.meetings_filter = function (is_booked=null) {
    const currtime = Date.now();
    let mlist;
  
    if (is_booked != null) {
      if (is_booked) {
        mlist = () => this.meetings.filter(m => m.booked);
      } else {
        mlist = () => this.meetings.filter(m => !m.booked);
      }
    } else {
      mlist = () => this.meetings;
    }
  
    return {
      // Starting after 5 minutes
      upcoming: sort(mlist().filter(i => i.start_time.getTime() >= currtime + 300000 )),
      
      current: sort(mlist().filter(i => i.start_time.getTime() < currtime + 300000 && i.end_time.getTime() >= currtime))
    }
  }

  module.exports = DB;