class EventsController < ApplicationController
  def index
    @start_date = Date.parse(params[:start_date]) if params[:start_date]
    @end_date = Date.parse(params[:end_date]) if params[:end_date]
    @events = Event.where(date: @start_date..@end_date)
  end

  def create
    Event.create params[:event]
  end
end
